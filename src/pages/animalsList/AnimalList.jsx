import React from 'react'
import { Link } from 'react-router-dom'

export function AnimalList ({ animalsInfos }) {
    return (
        <>
            <h1>Animals List</h1>
            <table>
                <tr>
                    <th colSpan={3}>Rare Animals</th>
                </tr>
                {
                    animalsInfos.map((animal) => (
                        <tr>
                            <td>{animal.type}</td>
                            <td>{animal.count}</td>
                            <td><Link to={`https://www.google.com/search?q=${animal.type}`} target='blank'>Search Animal</Link></td>
                        </tr>
                    ))
                }
            </table>
        </>
    )
}
