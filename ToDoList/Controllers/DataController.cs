using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ToDoList.Models;

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
            //return new JsonResult { Data = "Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}