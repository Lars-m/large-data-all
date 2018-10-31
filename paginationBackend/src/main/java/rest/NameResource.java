/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import dk.cphbusiness.Name;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author Plaul
 */
@Path("names")
public class NameResource {

  @Context
  private UriInfo context;

  private static final EntityManagerFactory emf = Persistence.createEntityManagerFactory("pu");

  /**
   * Creates a new instance of NameResource
   */
  public NameResource() {
  }

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response getJson(@QueryParam("_start") String _start, @QueryParam("_end") String _end,
          @QueryParam("_sort") String _sort, @QueryParam("_order") String _order) {
    EntityManager em = emf.createEntityManager();
    try {
      //http://localhost:1234/api?_start=0&_end=10
      //_sort=firstName&_order=asc
      String q = "SELECT n FROM Name n";
      if (_sort != null) {
        //Can't get this to work with parameters. This solution is open to SQl Injection !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        q += " ORDER BY n."+_sort;
        if (_order != null && (_order.toUpperCase().equals("ASC") || _order.toUpperCase().equals("DESC"))) {
          q += "  " + _order.toUpperCase();
        }
      }
      System.out.println("Query "+q);
      Query query = em.createQuery(q);
//      if(_sort != null){
//        System.out.println("-----> "+"n."+_sort);
//        query.setParameter("s","n."+_sort);
//      }
   
      if (_start != null && _end != null) {
        int start = Integer.parseInt(_start);
        int end = Integer.parseInt(_end);
        query.setFirstResult(start);
        query.setMaxResults(end - start);
      }
      System.out.println("QUERY:---> "+query.toString());
      List<Name> names = query.getResultList();
      
        Long count = (Long)  em.createQuery("select count(n) from Name n").getSingleResult();
      return Response.ok(names).header("X-Total-Count", count)
                               .header("Access-Control-Allow-Origin", "*")
                               .header("Access-Control-Expose-Headers", "X-Total-Count").build();
    } finally {
      em.close();
    }
  }

}
