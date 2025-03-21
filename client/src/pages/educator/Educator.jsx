import React from 'react'
import { Outlet } from 'react-router-dom'

function Educator() {
    return (
        <div>
            <div>Educator</div>
            <div>
                {<Outlet />}
            </div>
        </div>
    )
}

export default Educator