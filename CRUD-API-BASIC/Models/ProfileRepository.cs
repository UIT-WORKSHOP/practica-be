using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRUD_API_BASIC.Models
{
    public class ProfileRepository : IRepository<Profile,string>
    {
        private List<Profile> _data = new List<Profile>();

        public ProfileRepository()
        {
            //init data
            _data.Add(new Profile { ProfileName="abc",UserName="abc",Email="abc@gmail.com",Password="123"});
            _data.Add(new Profile { ProfileName="xinchao",UserName="xinchao",Email="xinchao@gmail.com",Password="456"});
        }

        public Profile Add(Profile item)
        {
            if(item != null)
            {
                _data.Add(item);
                return item;
            }else
            {
                throw new ArgumentNullException();
            }
        }

        public Profile Get(string id)
        {
            return _data.Find(x => x.UserName == id);
        }

        public IEnumerable<Profile> GetAll()
        {
            return _data;
        }

        public void Remove(string id)
        {
            _data.RemoveAll(x => x.UserName == id);
        }

        public bool Update(Profile item)
        {
            if(item != null)
            {
                var index = _data.FindIndex(x => x.UserName == item.UserName);
                if (index == -1)
                    return false;
                _data.RemoveAt(index);
                _data.Add(item);
                return true;
            }else
            {
                throw new ArgumentNullException();
            }
        }
    }
}