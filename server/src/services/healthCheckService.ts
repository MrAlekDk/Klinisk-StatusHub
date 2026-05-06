import { System } from "../models/System.js";
import db from "../db/database.js";

const runHealthCheck = () => {
    const systems: any[] = db.prepare('SELECT id, link FROM systems').all();
    console.log(systems);
    systems.forEach(system => {
        checkSystemStatus(system.link).then((res) =>{
            db.prepare(`
                INSERT INTO system_statuses (system_id, status, message)
                VALUES (?, ?, ?)
            `).run(system.id, res.status, res.message);

        })
    })
}

async function checkSystemStatus(url: string): Promise<{ status: string, message: string }> {
    try {
        const response = await fetch(url, { method: 'GET' });
        if(response.ok)
        {
            return { status: 'OK', message: 'Healthy' };
        }

        return {status: 'DEGRADED', message: `HTTP ${response.status}`}
    }
    catch(err: any)
    {
        return { status: 'DOWN', message: err.message };
    }
}

export default runHealthCheck;