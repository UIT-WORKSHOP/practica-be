using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRUD_API_BASIC.Models
{
    public interface IRepository<T,V> where T : class
    {
        IEnumerable<T> GetAll();
        T Get(V id);
        T Add(T item);
        void Remove(V id);
        bool Update(T item);
    }
}