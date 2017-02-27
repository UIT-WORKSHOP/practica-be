using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using task1.Models;


namespace task1.Controllers
{
    public class UsersController : ApiController
    {
       public IEnumerable<User> GetAllUser()
        {
            return new List<User>
            {
                new User() {id = 1, name = "NVA", password = "123", email = "NVA@gmail.com", profile = "aaaaaaaaaaaaaaaaaaaa"},
                new User() {id = 2, name = "NVB", password = "123", email = "NVB@gmail.com", profile = "bbbbbbbbbbbbbbbbbbbbb"},
                new User() {id = 3, name = "NVC", password = "123", email = "NVC@gmail.com", profile = "ccccccccccccccccccccc"},
            };
        }
       public User GetUsersById(int iid)
       {
           if (iid < 1 || iid > 3 )
           {
               throw new HttpResponseException(System.Net.HttpStatusCode.NotFound);

           }
           return new User() { id = iid, name = "TTC" };
       }
    }
}