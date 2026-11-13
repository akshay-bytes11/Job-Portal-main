import { User } from "../models/user.model.js";

const isRecruiter = async (req, res, next) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);
        if (!user || user.role !== 'recruiter') {
            return res.status(403).json({
                message: "Access denied. Recruiter role required.",
                success: false
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}
export default isRecruiter;
