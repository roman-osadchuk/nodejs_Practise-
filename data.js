const Joi = require('joi');

module.exports = {

    user_scores: [
        {
            name: 'Roman',
            scoreTime: 52,
            scoreEat: 8
        },
        {
            name: 'Taras',
            scoreTime: 44,
            scoreEat: 5
        },
        {
            name: 'Johny',
            scoreTime: 53,
            scoreEat: 7
        },
        {
            name: 'Michael',
            scoreTime: 40,
            scoreEat: 6
        },
        {
            name: 'Nico',
            scoreTime: 45,
            scoreEat: 5
        },
        {
            name: 'Rachel',
            scoreTime: 69,
            scoreEat: 9
        },
        {
            name: 'Lilya',
            scoreTime: 49,
            scoreEat: 7
        },
        {
            name: 'Nicol',
            scoreTime: 71,
            scoreEat: 12
        },
        {
            name: 'Jacob',
            scoreTime: 55,
            scoreEat: 7
        },
        {
            name: 'Moris',
            scoreTime: 51,
            scoreEat: 7
        },
        {
            name: 'Petro',
            scoreTime: 66,
            scoreEat: 9
        },
        {
            name: 'Ivan',
            scoreTime: 70,
            scoreEat: 9
        },
        {
            name: 'Bob',
            scoreTime: 63,
            scoreEat: 7
        },
        {
            name: 'Santiago',
            scoreTime: 38,
            scoreEat: 4
        },
        {
            name: 'Josh',
            scoreTime: 59,
            scoreEat: 9
        },
        {
            name: 'Ben',
            scoreTime: 56,
            scoreEat: 8
        },
        {
            name: 'Mark',
            scoreTime: 33,
            scoreEat: 5
        },
        {
            name: 'Steven',
            scoreTime: 67,
            scoreEat: 10
        },
        {
            name: 'Ashley',
            scoreTime: 62,
            scoreEat: 8
        },
        {
            name: 'Jula',
            scoreTime: 54,
            scoreEat: 7
        },
        {
            name: 'Roberto',
            scoreTime: 36,
            scoreEat: 5
        },
        {
            name: 'Frank',
            scoreTime: 44,
            scoreEat: 6
        },
        {
            name: 'Andrey',
            scoreTime: 55,
            scoreEat: 7
        },
        {
            name: 'Ira',
            scoreTime: 60,
            scoreEat: 7
        },
        {
            name: 'Boris',
            scoreTime: 68,
            scoreEat: 9
        }
    ],


    getAllInformation: (arr, params) => {
        
        let tempArr = arr.slice();

        for(let i in params){

            if(i === 'top'){
                if(params[i] === 'scoreTime'){
                    tempArr.sort(function(a, b){
                        return b.scoreTime - a.scoreTime
                    })
                }else if(params[i] === 'scoreEat'){
                    tempArr.sort(function(a, b){
                        return b.scoreEat - a.scoreEat
                    })
                }
            }else if(i === 'minValue'){
                tempArr = tempArr.filter(function(elt, ind, array){
                    return elt.scoreTime >= params[i]
                });
            }else if(i === 'maxValue'){
                tempArr = tempArr.filter(function(elt, ind, array){
                    return elt.scoreTime <= params[i]
                });
            }else if(i === 'count'){
                tempArr = tempArr.slice(0, parseInt(params[i]));
            }
        }
        
        return tempArr;
    },


    getUserHighestScore: (arr, user) => {

        for(let i = 0; i < arr.length; i++){
            if(arr[i].name === user){
                return arr[i]
            }
        }
        throw new Error("user:" + user + " can not be found");  
    },


    createNewUser: (arr, user, time, eat) => {

        const schema = Joi.object().keys({
            name: Joi.string().alphanum().min(3).max(30).required(),
            scoreTime: Joi.number().min(0).max(1000),
            scoreEat: Joi.number().min(0).max(100)
        });
        

        return Joi.validate({ name: user, scoreTime: time, scoreEat: eat }, schema, function (err, value) {
            if(err){
                return err.details[0].message;
            }else{
                for(let i = 0; i < arr.length; i++){
                    if(arr[i].name === user){
                        throw new Error("this user: " + user + " already exists");
                    }
                }
                arr.push({name: user, scoreTime: +time, scoreEat: +eat});
                return "new user " + user + " has beed added";
            }
        })

    },


    updateUser: (arr, user, time, eat) => {

        const schema = Joi.object().keys({
            name: Joi.string().alphanum().min(3).max(30).required(),
            scoreTime: Joi.number().min(0).max(1000),
            scoreEat: Joi.number().min(0).max(100)
        });
        

        return Joi.validate({ name: user, scoreTime: time, scoreEat: eat }, schema, function (err, value) {
            if(err){
                return err.details[0].message;
            }else{
                for(let i = 0; i < arr.length; i++){
                    if(arr[i].name === user){
                        arr[i].scoreTime = +time;
                        arr[i].scoreEat = +eat;
                        return "user:" + user + " has beed updated";
                    }
                }
                throw new Error("user:" + user + " can not be found");
            }
        })
    },


    removeUser: (arr, user) => {
        for(let i = 0; i < arr.length; i++){
            if(arr[i].name === user){
                arr.splice(i, 1);
                return 'user: ' + user + ' has been deleted';
            } 
        }
        throw new Error("user:" + user + " can not be found");
    }

}