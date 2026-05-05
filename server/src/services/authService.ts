import db from '../db/database.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';

export async function login(email: string, password: string) {
    
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as User | undefined;
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;

    const payload = { 
        id: user.id, 
        name: user.name,
        email: user.email,
        organisationId: user.organisation_id
    };

    const token = jwt.sign(payload, process.env['JWT_KEY'] as string, { expiresIn: '1h' });
    
    return token;

}