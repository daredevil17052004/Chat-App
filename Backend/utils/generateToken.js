// import jwt from 'jsonwebtoken';

// const generateTokenAndSetCookie = (userId,res) => {
//     const token = jwt.sign({userId}, process.env.JWT_SECRET, {
//         expiresIn: '15d'
//     });

//     res.cookie('jwt', token, {
//         httpOnly: true,  // prevents XSS attacks cross-site scripting attacks
//         maxAge: 15 * 24 * 60 * 60 * 1000,
//         sameSite: "strict", // csrf attacks
//         secure: process.env.NODE_ENV === 'development'
//     });
// };

// export default generateTokenAndSetCookie;

// import jwt from 'jsonwebtoken';

// const generateTokenAndSetCookie = (userId, res) => {
//     const token = jwt.sign({userId}, process.env.JWT_SECRET, {
//         expiresIn: '15d'
//     });

//     res.cookie('jwt', token, {
//         httpOnly: true,
//         maxAge: 15 * 24 * 60 * 60 * 1000,
//         sameSite: 'none', // Important for cross-origin
//         secure: true, // Required when sameSite is 'none'
//         path: '/'
//     });
// };

// export default generateTokenAndSetCookie;


import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        sameSite: 'none', // Required for cross-origin
        secure: true, // Required when sameSite is 'none'
        path: '/',
});
    
    console.log('Cookie set for user:', userId);
};

export default generateTokenAndSetCookie;