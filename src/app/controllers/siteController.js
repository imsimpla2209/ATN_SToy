class siteController {
    show = async(req, res) => {
        res.render('home', { layout: 'main' });
    }

    logout = async(req, res) => {
        res.clearCookie('token');
        res.redirect('/account/login');
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
module.exports = new siteController;