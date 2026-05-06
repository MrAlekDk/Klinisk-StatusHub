import { Request, Response } from 'express';
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
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 24  //1 day for now
            });

            res.json({success: true});
        } catch (error) {
            console.error('Login error:', error);

            res.status(500).json({message: 'Internal server error'});
        }
    },

    logout: async (req: Request, res: Response) => {
        res.clearCookie('jwt');
        res.json({ success: true });
    },

    getAuthenticationStatus: async (req: Request, res: Response) =>{
        res.json({ authenticated: true, user: (req as any).user });
    }
};