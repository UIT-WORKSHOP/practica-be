using CRUD_API_BASIC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace CRUD_API_BASIC.Controllers
{
    public class ProfileController : ApiController
    {
        private static IRepository<Profile, string> _data = new ProfileRepository();
        public ProfileController()
        {
            //_data = new ProfileRepository();
        }

        //get all item
        [ResponseType(typeof(IEnumerable<Profile>))]
        public HttpResponseMessage GetAll(HttpRequestMessage request)
        {
            try
            {
                var list =  _data.GetAll();
                return request.CreateResponse(HttpStatusCode.OK, list);
            }catch(Exception)
            {
                return request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }

        //get item by id
        [ResponseType(typeof(Profile))]
        public HttpResponseMessage GetProfileId(HttpRequestMessage request, string id)
        {
            try
            {
                Profile pro = _data.Get(id);
                if (pro == null)
                {
                    return new HttpResponseMessage(HttpStatusCode.NotFound);
                }
                return request.CreateResponse(HttpStatusCode.OK, pro);
            }catch(Exception)
            {
                return request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }

        //add item
        [ResponseType(typeof(Profile))]
        public HttpResponseMessage PostProfile(HttpRequestMessage request, Profile item)
        {
            try
            {
                var x = _data.Add(item);
                return request.CreateResponse(HttpStatusCode.Created, x);
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
        }

        //update item
        public HttpResponseMessage PutProfile(HttpRequestMessage request, string id, Profile item)
        {
            try
            {
                item.UserName = id;
                if (!_data.Update(item))
                {
                    return request.CreateResponse(HttpStatusCode.NotFound);
                }
                return request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception)
            {
                return request.CreateResponse(HttpStatusCode.InternalServerError);
            }

        }

        //delete item
        public HttpResponseMessage DeleteProfile(HttpRequestMessage request, string id)
        {
            try
            {
                Profile pro = _data.Get(id);
                if (pro != null)
                {
                    _data.Remove(id);
                    return request.CreateResponse(HttpStatusCode.OK);
                }
                return request.CreateResponse(HttpStatusCode.NotFound);
            }catch(Exception)
            {
                return request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }

    }
}
