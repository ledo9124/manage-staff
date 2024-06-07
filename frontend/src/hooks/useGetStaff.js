import React from 'react'
import instance from '../apis'

const useGetStaff = () => {
    (async () => {
        const { data } = await instance.get('/api/user/allStaffs')
        return data
    })()
}

export default useGetStaff