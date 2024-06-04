import { useEffect, useState } from "react";
import { getTable } from "../apis/Table";

const useGetTable = () => {
    const [loading, setLoading] = useState(false);
    const getAll = async () => {
        try {
            (async () => {
                const data = await getTable();
                console.log(data);
                return data
            })()
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(true)
        }
        return { loading, getAll }
    }
    // useEffect(() => {
    //     try {
    //         (async () => {
    //             const data = await getTable();
    //             // console.log(data);
    //             // return data
    //         })()
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setLoading(true)
    //     }
    // }, [loading]);
}

export default useGetTable