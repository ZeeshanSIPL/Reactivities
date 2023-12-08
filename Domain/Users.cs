using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Users
    {
        
        
        public int UserId {get;set;}
        public string UserName{get;set;}
        public string EmailAddress{get;set;}
        public string Password{get;set;}
        public string Token{get;set;}
        public bool IsDeleted{get;set;}
        public bool IsActive{get;set;}
        public bool EmailConfirmed{get;set;}
        public DateTime CreationTime{get;set;}
    }
}