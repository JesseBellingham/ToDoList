using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ToDoList.Models;
using System.Net.Http;

namespace ToDoList.Controllers
{
    public class DataController : Controller
    {
        // GET: Data
        public JsonResult GetListItems()
        {
            //ListItem li = null;

            using (ToDoListEntities dc = new ToDoListEntities())
            {
                var li = (dc.ListItems.ToList());
                return new JsonResult { Data = li, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        [HttpPost]
        public HttpResponseMessage PostListItem(ListItem li)
        {
            if (li == null)
            {
                return new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            }
            
            Console.WriteLine(li);

            ToDoListEntities dc = new ToDoListEntities();
            dc.ListItems.Add(li);
            try
            {
                dc.SaveChanges();
                return new HttpResponseMessage(System.Net.HttpStatusCode.Created);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            }
            
        }

        [HttpDelete]
        public HttpResponseMessage DeleteListItem(int id)
        {
            ToDoListEntities dc = new ToDoListEntities();
            ListItem item = dc.ListItems.Find(id);

            if (item == null)
            {
                return new HttpResponseMessage(System.Net.HttpStatusCode.NotFound);
            }
            dc.ListItems.Remove(item);
            try
            {
                dc.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return new HttpResponseMessage(System.Net.HttpStatusCode.OK);
        }
    }
}