from flask import Flask, request, jsonify
from flask import request
from flask_cors import CORS
import mysql.connector
from werkzeug.utils import secure_filename
import os
import time

#----------------------------------------------------------------------------

app = Flask(__name__)
CORS(app) # Esto habilitará CORS para todas las rutas, permite que el frontend de la aplicación haga solicitudes a la API desde un origen diferente (dominio, protocolo o puerto).

class Catalogo: # Constructor de la clase
    def __init__(self, host, user, password, database):
        # Primero, establecemos una conexión sin especificar la base de datos
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password
            )
        self.cursor = self.conn.cursor()

        # Intentamos seleccionar la base de datos
        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
            # Si la base de datos no existe, la creamos
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise err
            
        # Una vez que la base de datos está establecida, creamos la tabla si no existe
        self.cursor.execute('''CREATE TABLE IF NOT EXISTS peliculas ( codigo INT, titulo VARCHAR(40) NOT NULL, duracion INT NOT NULL, anio INT(4) NOT NULL, imagen_url VARCHAR(40), director VARCHAR(40))''')
        self.conn.commit()

        # Cerrar el cursor inicial y abrir uno nuevo con el parámetro dictionary=True
        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)

#----------------------------------------------------------------------------

    def listar_pelicula(self):
        self.cursor.execute("SELECT * FROM peliculas")
        peliculas = self.cursor.fetchall()
        return peliculas        

#----------------------------------------------------------------------------

    def consultar_pelicula(self, codigo): # Consultamos una película a partir de su código
        self.cursor.execute(f"SELECT * FROM peliculas WHERE codigo = {codigo}")
        return self.cursor.fetchone()

#----------------------------------------------------------------------------

    def mostrar_pelicula(self, codigo): # Mostramos los datos de una película a partir de su código
        pelicula = self.consultar_pelicula(codigo)
        if pelicula:
            print("-" * 40)
            print(f"Código.....: {pelicula['codigo']}")
            print(f"Título: {pelicula['titulo']}")
            print(f"Duración...: {pelicula['duracion']}")
            print(f"Año.....: {pelicula['anio']}")
            print(f"Imagen.....: {pelicula['imagen_url']}")
            print(f"Director..: {pelicula['director']}")
            print("-" * 40)
        else:
            print("Película no encontrada.")

#----------------------------------------------------------------------------

    def agregar_pelicula(self, codigo, titulo, duracion, anio, imagen, director):
        
        # Verificamos si ya existe una película con el mismo código
        self.cursor.execute(f"SELECT * FROM peliculas WHERE codigo = {codigo}")
        pelicula_existe = self.cursor.fetchone()
        if pelicula_existe:
            return False
        
        # Si no existe, agregamos nueva película a la tabla
        sql = "INSERT INTO peliculas (codigo, titulo, duracion, anio, imagen_url, director) VALUES (%s, %s, %s, %s, %s, %s)"
        valores = (codigo, titulo, duracion, anio, imagen, director)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return True

#----------------------------------------------------------------------------

    def eliminar_pelicula(self, codigo):
        # Eliminamos una película de la tabla a partir de su código
        self.cursor.execute(f"DELETE FROM peliculas WHERE codigo = {codigo}")
        self.conn.commit()
        return self.cursor.rowcount > 0

#----------------------------------------------------------------------------

    def modificar_pelicula(self, codigo, nuevo_titulo, nueva_duracion, nuevo_anio, nueva_imagen, nuevo_director):
        sql = "UPDATE peliculas SET titulo = %s, duracion = %s, anio = %s, imagen_url = %s, director = %s WHERE codigo = %s"
        valores = (nuevo_titulo, nueva_duracion, nuevo_anio, nueva_imagen, nuevo_director, codigo)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.rowcount > 0

#----------------------------------------------------------------------------
# Cuerpo del programa #----------------------------------------------------------------------------
        
# Crear una instancia de la clase Catalogo
        
catalogo = Catalogo(host='dumdev89.mysql.pythonanywhere-services.com', user='dumdev89', password='dbdev3011', database='dumdev89$myapp')
# catalogo = Catalogo(host='localhost', user='root', password='', database='MisPeliculas')
        
# Carpeta para guardar las imagenes
        
ruta_destino = '/home/dumdev89/mysite/static/img/'
# ruta_destino = 'static/img/'

#----------------------------------------------------------------------------

@app.route("/peliculas", methods=["GET"]) #Este decorador asocia listar_peliculas con la URL /peliculas
def listar_pelicula():
    peliculas = catalogo.listar_pelicula()
    return jsonify(peliculas)

#----------------------------------------------------------------------------

@app.route("/peliculas/<int:codigo>", methods=["GET"])
def mostrar_pelicula(codigo):
    pelicula = catalogo.consultar_pelicula(codigo)
    if pelicula:
        return jsonify(pelicula)
    else:
        return "Película no encontrada", 404

#----------------------------------------------------------------------------

@app.route("/peliculas", methods=["POST"])
def agregar_pelicula(): # Recojo los datos del form
    codigo = request.form['codigo']
    titulo = request.form['titulo']
    duracion = request.form['duracion']
    anio = request.form['anio']
    director = request.form['director']
    imagen = request.files['imagen']
    nombre_imagen = secure_filename(imagen.filename)
    
    nombre_base, extension = os.path.splitext(nombre_imagen)
    nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
    imagen.save(os.path.join(ruta_destino, nombre_imagen))
    
    if catalogo.agregar_pelicula(codigo, titulo, duracion, anio, nombre_imagen, director):
        return jsonify({"mensaje": "Película agregada"}), 201
    else:
        return jsonify({"mensaje": "Esta película ya existe"}), 400


#----------------------------------------------------------------------------

@app.route("/peliculas/<int:codigo>", methods=["DELETE"])
def eliminar_pelicula(codigo):
    # Primero, obtén la información de la película para encontrar la imagen
    pelicula = catalogo.consultar_pelicula(codigo)
    if pelicula:
        # Eliminar la imagen asociada si existe
        ruta_imagen = os.path.join(ruta_destino, pelicula['imagen_url'])
        if os.path.exists(ruta_imagen):
            os.remove(ruta_imagen)
            
        # Luego, elimina la película del catálogo
        if catalogo.eliminar_pelicula(codigo):
            return jsonify({"mensaje": "Película eliminada"}), 200
        else:
            return jsonify({"mensaje": "Error al eliminar la película"}), 500
    else:
        return jsonify({"mensaje": "Película no encontrada"}), 404

#----------------------------------------------------------------------------

@app.route("/peliculas/<int:codigo>", methods=["PUT"])
def modificar_pelicula(codigo):
    # Recojo los datos del form
    nuevo_titulo = request.form.get("titulo")
    nueva_duracion = request.form.get("duracion")
    nuevo_anio = request.form.get("anio")
    nuevo_director = request.form.get("director")
    
    # Procesamiento de la imagen
    imagen = request.files['imagen']
    nombre_imagen = secure_filename(imagen.filename)
    nombre_base, extension = os.path.splitext(nombre_imagen)
    nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
    imagen.save(os.path.join(ruta_destino, nombre_imagen))
    
    # Actualización de la película
    if catalogo.modificar_pelicula(codigo, nuevo_titulo, nueva_duracion, nuevo_anio, nombre_imagen, nuevo_director):
        return jsonify({"mensaje": "Película modificada"}), 200
    else:
        return jsonify({"mensaje": "Película no encontrada"}), 404

if __name__ == '__main__':
    app.run(debug=True)