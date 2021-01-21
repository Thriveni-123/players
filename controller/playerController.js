const playerService = require('../service/playerService');
const constants = require('../constants');

var globalRes;

module.exports.Login =  async (req,res) => {
    globalRes = res;
    try {
        await playerService.Login(req.body,LoginResponse);
    }catch(error){
        console.log('Something went wrong: Controller : Login',error); 
    }
}

function LoginResponse(err, result,type) {
    let response = {...constants.defaultServerResponse};
    try {
            if(err){
                response.message = err.message;
            }else {
                const responseFromService =  result;
               
                if(type == 1)  
                {
                    response.status = 201;
                    response.message = constants.USERMESSAGE.EMAIL_NOT_THERE;
                }  
                    
                else if(type==2)
                {
                    response.status = 202;
                    response.message = constants.USERMESSAGE.INCORRECT_PASSWORD;
                }
                else 
                {
                    response.status = 200;
                    response.message = constants.USERMESSAGE.LOGIN;
                }
                    
                    response.body = responseFromService;
            }
     }catch(error){
        console.log('Something went wrong: Controller :LoginResponse',error);
        response.message = error.message; 
     }
     return globalRes.status(response.status).send(response);
  }
