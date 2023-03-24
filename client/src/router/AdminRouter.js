import React from 'react'
import { Routes, Route} from "react-router-dom"
import { AdminLayout } from '../layouts'
//gracias a los index usados casi en cada carpeta para importar todos los componentes, podemos importarlos con sus nombres por parte de la carpeta padre de todos, en este caso se esta importando
//los componentes de las paginas de administracion contenidas en la carpeta admin dentro de la carpeta pages
import { Auth, Users } from "../pages/admin"

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
      {!user ? (
      <Route path="/admin/*" element={ loadLayout(AdminLayout, Auth) }/>
    ) : (
      <Route path="/admin/users" element={ loadLayout(AdminLayout, Users) }/>
    )}
    </Routes>
  )
}
