module.exports = (req, res, next) => {
    console.log()
    if(req.user.credits < 1){
        return res.status(403).send({ error: 'Not enough credits'+req.user.credits});
    }
    next();
};