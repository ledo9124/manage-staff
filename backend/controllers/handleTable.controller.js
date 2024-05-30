const timeoutManager = {}; // {name : [...timeoutId]}

// Thêm một timeout vào đối tượng
function addTimeout(name, callback, delay) {
    const timeoutId = setTimeout(() => {
        callback();
        timeoutManager[name].shift(); // Xóa timeout sau khi thực thi
    }, delay);
    if (timeoutManager[name].length == 0) {
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
// function clearAllTimeouts() {
//   for (const name in timeoutManager) {
//     clearTimeout(timeoutManager[name]);
//   }
//   for (const name in timeoutManager) {
//     delete timeoutManager[name];
//   }
// }

const userOnlines = [];
const tablesOpen = [];

// Tìm ra nhân viên có thể thay thế
const userNeedChange = () => {
    return new Promise((resolve, reject) => {
        if (!userOnlines.length) {
            return reject({ error: "There are no employees online!" });
        }

        let obRest = null;
        User.find({ _id: { $in: userOnlines }, role: "1" })
            .then((data) => {
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
                            let dateObRest = new Date(obRest.timeRest);
                            let dateItem = new Date(item.timeRest);
                            if (dateObRest > dateItem) {
                                obRest = item;
                            }
                        }
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
        console.log("Found user:", user);

        let dataUser = {
            special: "0",
            timeRest: "0",
            timeWork: currentTime,
        };

        try {
            const updatedUser = await updateUser(user._id, dataUser);
            console.log("User updated successfully:", updatedUser);

            try {
                let dataTable = {
                    status: true,
                    operatingTime: currentTime,
                    userId: user._id,
                };

                const updatedTable = await updateTable(tableId, dataTable);
                tablesOpen.push(updatedTable._id);
                console.log("Table updated successfully:", updatedTable);

                addTimeout(
                    tableId,
                    processChangeStaff(updatedTable, updatedUser),
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

const processChangeStaff = async (currTable, currStaff) => {
    if (currTable._id !== tablesOpen[0]) {
        
    }

    const user = await userNeedChange();

    if (user) {
        issetStaff(currTable, currStaff, user);
        return;
    }

    notIssetStaff(currTable, currStaff);
};

const issetStaff = async (currTable, currStaff, newStaff) => {
    const currentTime = new Date();

    let dataUser = {
        countWork: 1,
        timeRest: "0",
    };

    try {
        const updatedUser = await updateUser(newStaff._id, dataUser);
        console.log("User updated successfully:", updatedUser);

        try {
            const updatedTable = await updateTable(currTable._id, {
                userIdNext: newStaff._id,
            });
            console.log("Table updated successfully:", updatedTable);

            addTimeout(
                currTable._id,
                async (currTable, currStaff, newStaff) => {
                    let dataTable = {
                        userId: newStaff._id,
                        userIdNext: "0",
                    };

                    try {
                        const updatedTable = await updateTable(
                            currTable._id,
                            dataTable
                        );
                        console.log(
                            "Table updated successfully:",
                            updatedTable
                        );

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
                            processChangeStaff(currTable, updatedNewStaff),
                            35000
                        );
                    } catch (error) {
                        console.error("Error updating table:", err);
                        return res.json({ error: "Error updating table." });
                    }
                },
                5000
            ); // Thực thi đổi nhân viên cho bàn.
        } catch (error) {
            console.error("Error updating table:", err);
            return res.json({ error: "Error updating table." });
        }
    } catch (error) {
        console.error("Error updating user:", err);
        return res.json({ error: "Error updating user." });
    }
};

const notIssetStaff = async (currTable, currStaff) => {

};