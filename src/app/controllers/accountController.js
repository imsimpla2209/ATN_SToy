const Account = require('../models/account.model');
const { multipleMongooseToObject } = require('../../util/mongoose');
const jwt = require('jsonwebtoken');
const secretKey = 'Cocaidbhackdc';
//Secrect key to sign and verify jwt

class AccountController {
    create = async(req, res) => {
        let { username, password, fullname, role } = req.fields;
        let account = await Account.findOne({ username: username });
        if (account) {
            res.json({
                status: 'error',
                message: 'Tên đăng nhập đã tồn tại!'
            })
        }
        try {
            let newAccount = Account.create(req.fields);
            res.json({
                status: 'success',
                message: 'Tạo tài khoản thành công!'
            })
        } catch (error) {
            res.json({
                status: 'error',
                message: 'Tạo tài khoản thất bại'
            })
        }
    }

    register = (req, res) => {
        res.render('account/add', {});
    }

    show = async(req, res) => {
        try {
            let accounts = await Account.find({});
            res.render('account/show', { layout: 'main', accounts: multipleMongooseToObject(accounts) });
        } catch (error) {
            res.json({
                status: 'error',
                message: 'Something went wrong'
            })
        }
    }

    showLogin = (req, res) => {
        try {
            let token = req.cookies.token;
            let result = jwt.verify(token, secretKey);
            console.log(result);
            if (result) {
                res.redirect('/');
            }
        } catch (error) {
            res.render('account/login', { layout: 'none' });
        }

    }

    login = async(req, res) => {
        let { username, password } = req.fields;
        try {
            let account = await Account.findOne({ username: username });
            if (account) {
                try {
                    // let account = await Account.fineOne({ username: username, password: password });
                    if (password === account.password) {
                        let accessToken = jwt.sign({ username: username }, secretKey);
                        res.json({
                            status: 'success',
                            message: 'Đăng nhập thành công rồi',
                            accessToken: accessToken,
                        })
                    }

                } catch (err) {
                    res.json({
                        status: 'error',
                        message: 'Mật khẩu Đéo đúng'
                    })
                }
            }
        } catch (err) {
            console.log(err);
            res.json({
                status: 'error',
                message: 'Tài khoản Đéo tồn tại'
            })
        }
    }
}

module.exports = new AccountController;