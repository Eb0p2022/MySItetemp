const knex = require('../util/db_setup');
class User{
    constructor(){
        this.userDB = knex('media.adminusers');
    }

    verify(username, password){
        let user = this.userDB.where({
            username: username
        }).select('*');
        console.log(user);
    }

    async findByUsername(username){
        return new Promise((resolve, reject) => {
            const result = this.userDB.where({
                username: username
            }).select('*');
            resolve(result);
        })
    }

    createUser(userObj){
        return new Promise((resolve, reject) => {
            this.userDB.insert([userObj])
        })
        
    }
}

let test_User = new User();
test_User.verify('Gbolu');