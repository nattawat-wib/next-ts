import { useState } from "react";
import { ChangeEvent, FormEvent, DetailedHTMLProps } from 'react';
import { Properties } from 'csstype';
import { GetServerSideProps } from 'next';
import axios from 'axios';

interface formProp {
    id?: number,
    name?: string,
    phone?: number,
}

interface propProp {
    status: string,
    msg: string,
    user: formProp[]
}

const columnStyle: Properties = {
    border: '1px solid white',
    padding: '5px'
}

const tableStyle: Properties = {
    borderCollapse: 'collapse',
    margin: 'auto'
}

const Register = ({ user }: propProp) => {
    const [form, setForm] = useState<formProp>({});
    const [studentList, setStudentList] = useState<formProp[]>(user);

    const handleFormSubmit = (e: FormEvent): void => {
        e.preventDefault();

        setStudentList(prev => ([
            ...prev,
            {
                id: Date.now(),
                ...form
            }
        ]))

        setForm({});
    }

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <>
            <h1> this is register page </h1>
            <form onSubmit={handleFormSubmit}>
                <input onChange={handleFormChange} value={form.name || ''} name='name' placeholder='name' />
                <input onChange={handleFormChange} value={form.phone || ''} name='phone' type='number' placeholder='phone' />
                <button type='submit'> submit </button>
            </form>

            <div>
                <h4> all students </h4>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={columnStyle}> ID </th>
                            <th style={columnStyle}> Name </th>
                            <th style={columnStyle}> phone </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            studentList.map(student => {
                                return (
                                    <tr key={student.id}>
                                        <td style={columnStyle}> {student.id} </td>
                                        <td style={columnStyle}> {student.name} </td>
                                        <td style={columnStyle}> {student.phone} </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Register;
export const getServerSideProps: GetServerSideProps = async () => {

    // const user = await fetch('https://jsonplaceholder.typicode.com/users').then(data => data.json());
    const user = await axios.get('https://jsonplaceholder.typicode.com/users').then(resp => resp.data);

    return {
        props: {
            status: 'success',
            msg: 'all user here',
            user,
        }
    }
}