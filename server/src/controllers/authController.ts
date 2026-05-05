import {Request, Response} from 'express';
import * as authService from '../services/authService.js';

export const authcontroller = {
    login: async (req: Request, res: Response) => {
        try {
            const {username, password} = req.body;
            if (!username || !password) {
                return res.status(400).json({message: 'Username and password are required'});
            }

        
            const token = await authService.login(username, password);
            if (!token) {
                return res.status(401).json({message: 'Invalid credentials'});
            }
            res.json({token});
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({message: 'Internal server error'});
        }
    }
};