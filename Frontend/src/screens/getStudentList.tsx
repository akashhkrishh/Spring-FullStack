import React, { useEffect, useState } from 'react'
import { Student } from '../models/task.model';
import axios from 'axios';

const GetStudentList: React.FC = () => {
    const [data, setData] = useState<Student[]>([]);

    const fetchData = async () => {
        await axios.get("http://localhost:8080/api/getAll")
            .then((res) => { setData(res.data) })
            .catch((err) => { console.log(err) });
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (

        <div className="relative w-[1000px]  mt-4 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="pl-6 pr-2 py-3">
                            Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Roll
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Address
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((items, index) => {
                            return (
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="pl-6 pr-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">
                                        {items.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {items.roll}
                                    </td>
                                    <td className="px-6 py-4">
                                        {items.address}
                                    </td>

                                </tr>
                            );
                        })
                    }

                </tbody>
            </table>
        </div>

    )
}

export default GetStudentList