using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CRUD_API_BASIC.Models;
namespace CRUD_API_BASIC.Tests
{
    [TestClass]
    public class ProfileRepositoryTest
    {
        [TestMethod]
        public void GetAllDataTest()
        {
            ProfileRepository repo = new ProfileRepository();
            int x = repo.GetAll().Count();
            Assert.AreEqual(2,x);
        }
        [TestMethod]
        public void Add_Get_Delete_ItemTest()
        {
            ProfileRepository repo = new ProfileRepository();
            Profile pro = new Profile { UserName = "hello", ProfileName = "hello1", Password = "143", Email = "hello@gmail.com" };
            //add 
            repo.Add(pro);
            var temp = repo.Get(pro.UserName);
            Assert.IsNotNull(temp);
            //remove
            repo.Remove(pro.UserName);
        }

        [TestMethod]
        public void UpdateProfileTest()
        {
            ProfileRepository repo = new ProfileRepository();
            Profile pro = new Profile { UserName = "hello", ProfileName = "hello1", Password = "143", Email = "hello@gmail.com" };
            //add 
            repo.Add(pro);
            //change value 
            pro.Password = "ngaydeptroi";
            var booll = repo.Update(pro);
            //check remove success
            Assert.AreEqual(true, booll);
            var temp = repo.Get(pro.UserName);
            Assert.AreEqual(pro.Password, temp.Password);
        }
    }
}
