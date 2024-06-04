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