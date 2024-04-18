import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Student } from './models/task.model';
import axios from 'axios';

interface NewStudent {
    name: string;
    roll: number;
    address: string;
}

const App: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [newStudent, setNewStudent] = useState<NewStudent>({
        name: '',
        roll: 0,
        address: ''
    });
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/getAll');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };
    useEffect(() => {


        fetchData();
    }, []);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewStudent({
            ...newStudent,
            [name]: value
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/create', newStudent);
            const addedStudent: Student = response.data;
            setStudents([...students, addedStudent]);
            setNewStudent({
                name: '',
                roll: 0,
                address: ''
            }); // Clear the form fields after adding student
            fetchData()
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    return (
        <div className='bg-gray-900 w-screen h-screen text-white flex  flex-col py-10 items-center' >
            <form onSubmit={handleSubmit} className='flex gap-6 w-[1000px] items-center justify-between p-6 border rounded-md'>
                <div className='input-field'>
                    <label>Name:</label>
                    <input className='input' type="text" name="name" value={newStudent.name} onChange={handleInputChange} required />
                </div>
                <div className='input-field'>
                    <label>Roll:</label>
                    <input type="number" className='input' name="roll" value={newStudent.roll.toString()} onChange={handleInputChange} required />
                </div>
                <div className='input-field'>
                    <label>Address:</label>
                    <input type="text" className='input' name="address" value={newStudent.address} onChange={handleInputChange} required />
                </div>
                <button className='bg-blue-500 px-6 py-2 rounded-md' type="submit">Add</button>
            </form>
            <ul>
                <div className="relative w-[1000px]  mt-4 overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                                students.map((items, index) => {
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
            </ul>
        </div>
    );
};

export default App;
