import React from 'react'
import { Routes, Route} from "react-router-dom"
import { AdminLayout } from '../layouts'
//gracias a los index usados casi en cada carpeta para importar todos los componentes, podemos importarlos con sus nombres por parte de la carpeta padre de todos, en este caso se esta importando
//los componentes de las paginas de administracion contenidas en la carpeta admin dentro de la carpeta pages
import { Auth, Users, Blog, Courses, Menu, Newsletter } from "../pages/admin"

const user = null

export function AdminRouter() {
  
  //funcion para renderizar primero un layout que sera el encabezado trasversal de la pagina y la pagina que le asignemos a la ruta
  const loadLayout = (Layout, Page)=>{
    return(
      <Layout>
        <Page/>
      </Layout>
    )
  }


  //aqui es donde devuelve un contenedor llamado <Routes> con contenido con etiqueta <Route> que es donde se asigna la ruta (Path) y el elemento (element) el cual es donde va la pagina que queramos
  //renderizar
  return (
  <Routes>
      {/* Esta condicion de abajo significa que si el valor de usuario(que proximamente hara referencia a una funcion de autenticacion) es nulo, significa que no esta logeado y solo se le dara 
        acceso a la pagina principal de admin. en caso de estar autorizado tendra acceso a las demas direcciones */}
      {!user ? (
      <Route path="/admin/*" element={ <Auth/> }/>
    ) : (
      <>
      {/*El arreglo con funcion .map() de abajo es utilizado para que una pagina tenga dos paths, es decir, que en dos direcciones diferentes se renderize los mismos componentes */}
        {["/admin", "/admin/blog"].map((path) => (
          <Route key={path} path={path} element={ loadLayout(AdminLayout, Blog) } />
        ))}

        <Route path="/admin/users" element={ loadLayout(AdminLayout, Users) }/>
        <Route path="/admin/courses" element={ loadLayout(AdminLayout, Courses) }/>
        <Route path="/admin/menu" element={ loadLayout(AdminLayout, Menu) }/>
        <Route path="/admin/newsletter" element={ loadLayout(AdminLayout, Newsletter) }/>

      </>
    )}
    </Routes>
  )
}
