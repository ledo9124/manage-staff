import instance from "."

export const getTable = async () => {
    try {
        const { data } = await instance.get('/api/table')
        // console.log(data);
        return data
    } catch (error) {
        console.log(error);
    }
}

export const openTable = async (tableId) => {
    try {
        const { data } = await instance.get(`/api/table/openTable/${tableId}`);
        return data.table;
    } catch (error) {
        console.log(error);
    }
}

export const closeTable = async (tableId) => {
    try {
        const { data } = await instance.get(`/api/table/closeTable/${tableId}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}