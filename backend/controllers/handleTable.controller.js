import User from "../models/user.model.js";
import Table from "../models/table.model.js";

const timeoutManager = {}; // {name : [...timeoutId]}

// Thêm một timeout vào đối tượng
function addTimeout(name, callback, delay) {
    const timeoutId = setTimeout(() => {
        callback();
        timeoutManager[name].shift(); // Xóa timeout sau khi thực thi
    }, delay);
    if (!timeoutManager[name]) {
        timeoutManager[name] = [timeoutId];
        return;
    }
    timeoutManager[name].push(timeoutId);
}

// Hủy bỏ một timeout cụ thể
function clearTimeoutByName(name) {
    timeoutManager[name].forEach((id) => {
        clearTimeout(id);
    });
    timeoutManager[name].length = 0;
}

// Hủy bỏ tất cả các timeout
function clearAllTimeouts() {
  for (const name in timeoutManager) {
    clearTimeoutByName(name);
  }
  for (const name in timeoutManager) {
    delete timeoutManager[name];
  }
}

const userOnlines = [
    "664c90e2fc6fe43e66482828",
    "664c9188fc6fe43e6648282b",
    "6656e443d367b2c07cb92026",
    "665f3057334a43323240b4de",
    "66607312c5d098ee1a587650"
];
const tablesOpen = [];

// Tìm ra nhân viên có thể thay thế
const userNeedChange = (currTable = null, currStaff = null) => {
    return new Promise((resolve, reject) => {
        if (!userOnlines.length) {
            return reject({ error: "There are no employees online!" });
        }

        let obRest = null;
        User.find({ _id: { $in: userOnlines }, role: "1" })
            .then(async (data) => {
                if (data.length === 0) {
                    return resolve(null);
                }

                for (let item of data) {
                    if (item.special === "1") {
                        return resolve(item);
                    }
                    if (item.timeRest !== "0") {
                        if (!obRest) {
                            obRest = item;
                        } else {
                            const dateObRest = new Date(obRest.timeRest);
                            const dateItem = new Date(item.timeRest);
                            if (dateObRest > dateItem) {
                                obRest = item;
                            }
                        }
                    }
                }
                console.log("Found staff" , obRest);
                if (obRest) {
                    const currentTime = new Date();
                    const table = await Table.findById(tablesOpen[0]);
                    if (table.operatingTime !== "0") {
                        
                    }
                    const dateTable = new Date(table.operatingTime);
                    let timeRested = currentTime - dateTable;
                    let timeNeedRest = 35 * 1000;
                    if (timeRested < timeNeedRest) {
                        addTimeout(
                            currTable._id,
                            () => processChangeStaff(currTable, currStaff),
                            timeNeedRest - timeRested
                        );
                        return resolve(null);
                    }

                    const dateObRest = new Date(obRest.timeRest);
                    timeRested = currentTime - dateObRest;
                    timeNeedRest = 15 * 1000; //MS
                    console.log(timeRested);
                    if (timeRested < timeNeedRest) {
                        addTimeout(
                            currTable._id,
                            () => processChangeStaff(currTable, currStaff),
                            timeNeedRest - timeRested
                        );
                        return resolve(null);
                    }
                }
                resolve(obRest);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const updateUser = (id, data) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(id, data, { new: true })
            .then((updatedData) => resolve(updatedData))
            .catch((err) => reject(err));
    });
};

const updateTable = (id, data) => {
    return new Promise((resolve, reject) => {
        Table.findByIdAndUpdate(id, data, { new: true })
            .populate("userId")
            .then((updatedData) => resolve(updatedData))
            .catch((err) => reject(err));
    });
};

export const openTable = async (req, res) => {
    const tableId = req.params.id;
    const currentTime = new Date();

    try {
        const user = await userNeedChange();
        if (!user) {
            console.log("No user found that matches the criteria.");
            return res.json({
                error: "No user found that matches the criteria.",
            });
        }
        // console.log("Found user:", user);

        let dataUser = {
            special: "0",
            timeRest: "0",
            timeWork: currentTime,
        };

        try {
            const updatedUser = await updateUser(user._id, dataUser);
            // console.log("User updated successfully:", updatedUser);

            try {
                let dataTable = {
                    status: true,
                    operatingTime: currentTime,
                    userId: user._id,
                };

                const updatedTable = await updateTable(tableId, dataTable);
                tablesOpen.push(String(updatedTable._id));
                // console.log("Table updated successfully:", updatedTable);

                addTimeout(
                    tableId,
                    () => processChangeStaff(updatedTable, updatedUser),
                    35000
                );

                return res.json({ success: true, table: updatedTable });
            } catch (err) {
                console.error("Error updating table:", err);
                return res.json({ error: "Error updating table." });
            }
        } catch (err) {
            console.error("Error updating user:", err);
            return res.json({ error: "Error updating user." });
        }
    } catch (err) {
        console.error("Error finding user:", err);
        return res.json({ error: "Error finding user." });
    }
};

const processChangeStaff = async (currTable = null, currStaff = null) => {
    if (String(currTable?._id) !== tablesOpen[0]) {
        currTable = await Table.findById(tablesOpen[0]);

        currStaff = await User.findById(String(currTable.userId));
        console.log("dao day", tablesOpen[0], currTable._id);
    }

    const user = await userNeedChange(currTable, currStaff);
    console.log("user se change", user);
    console.log(timeoutManager);

    if (user) {
        issetStaff(currTable, currStaff, user);
    }
};

const issetStaff = async (currTable, currStaff, newStaff) => {
    let dataUser = {
        special: "0",
        timeRest: "0",
    };

    try {
        const updatedUser = await updateUser(newStaff._id, dataUser);
        // console.log("User updated successfully:", updatedUser);

        try {
            const updatedTable = await updateTable(currTable._id, {
                userIdNext: newStaff._id,
            });
            // console.log("Table updated successfully:", updatedTable);

            addTimeout(
                currTable._id,
                () => handleChangeStaff(currTable, currStaff, newStaff),
                5000
            ); // Thực thi đổi nhân viên cho bàn.
        } catch (error) {
            console.error("Error updating table:", error);
        }
    } catch (error) {
        console.error("Error updating user:", error);
    }
};

const handleChangeStaff = async (currTable, currStaff, newStaff) => {
    const currentTime = new Date();

    let dataTable = {
        userId: newStaff._id,
        userIdNext: "0",
    };

    try {
        const updatedTable = await updateTable(currTable._id, dataTable);
        // console.log("Table updated successfully:", updatedTable);

        await updateUser(currStaff._id, {
            timeRest: currentTime,
            timeWork: "0",
        });

        const updatedNewStaff = await updateUser(newStaff._id, {
            timeRest: "0",
            timeWork: currentTime,
        });

        const table = tablesOpen.shift();
        tablesOpen.push(table); // thay đổi vị trí của bàn đã được đổi nhân viên

        addTimeout(
            currTable._id,
            () => processChangeStaff(currTable, updatedNewStaff),
            35000
        );
    } catch (error) {
        console.error("Error updating table:", error);
    }
};

export const closeTable = async (req, res) => {
    try {
        const tableId = req.params.id;

        const currnetTime = new Date();

        const table = await Table.findById(tableId);

        if (!table) {
            return res.json({ message: "Hết cứu!" });
        }

        let dataUser = {
            timeRest: `${currnetTime}`,
            timeWork: "0",
        };

        if (timeoutManager[tableId]) {
            clearTimeoutByName(tableId);
        }

        if (table.userId) {
            const updatedStaff = await updateUser(table.userId, dataUser);
            processChangeStaff(table , updatedStaff);
        }

        if (table.userIdNext !== "0") {
            const updatedNewStaff = await updateUser(table.userIdNext, dataUser);
            processChangeStaff(table , updatedNewStaff);
        }

        let dataTable = {
            status: false,
            operatingTime: "0",
            userId: "aaaaaaaaaaaaaaaaaaaaaaaa",
            userIdNext: "0",
        };

        const updatedTable = await updateTable(tableId, dataTable);

        res.json(updatedTable);
    } catch (error) {
        console.log("Error in closeTable handleTable controller", error);
        res.status(500).json({ error: "Interver Server Error!" });
    }
};
