const canvas = document.getElementById('glcanvas');
const gl = canvas.getContext('webgl2');

gl.clearColor(1, 1, 1, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

//DECLARAMOS SHADER DE VERTICES

const vertexShader = `#version 300 es
    precision mediump float;
    in vec2 position;
    in vec3 color;
    out vec3 vColor;
    void main()
    {
        gl_Position = vec4(position,0,1);
        vColor = color;
    }

`;

const fragmentShader = `#version 300 es
    precision mediump float;
    out vec4 fragColor;
    in vec3 vColor;
    void main()
    {
        fragColor = vec4(vColor,1);
    }
`;

//COMPILAR SHADERS
const vs = gl.createShader(gl.VERTEX_SHADER);
const fs = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vs,vertexShader);
gl.shaderSource(fs,fragmentShader);
gl.compileShader(vs);
gl.compileShader(fs);

if(!gl.getShaderParameter(vs,gl.COMPILE_STATUS)){
    console.error(gl.getShaderInfoLog(vs));
}

if(!gl.getShaderParameter(fs,gl.COMPILE_STATUS)){
    console.error(gl.getShaderInfoLog(fs));
}

const program = gl.createProgram();

gl.attachShader(program,vs);
gl.attachShader(program,fs);
gl.linkProgram(program);

if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
    console.error(gl.getProgramInfoLog(program));
}

gl.useProgram(program);

//AÑADIMOS CODIGO PARA DIBUJAR EL TRIANGULO

const trianguloCoords=[ 

//FIGURA IZQUIERDA
    -0.9, -0.4, //0
    -0.9, -1.0, //1
    -0.3, -1.0, //2

    -0.9, -0.4,
    -0.3, -0.4,
    -0.3, -1.0,
//cuadrado pequeño
    -0.75, -0.7,
    -0.6, -0.55,
    -0.45, -0.7,

    -0.75, -0.7,
    -0.6, -0.85,
    -0.45, -0.7,
//techo triangulo izquierdo
    -0.9, -0.4,
    -0.6, 0.2,
    -0.3, -0.4,
//bandera izquierda
    -0.6, 0.2,
    -0.6, 0.45,
    -0.4, 0.33,
//FIGURA CENTRAL
    -0.3, 0.5,
    0.3, 0.5,
    -0.3, -1.0,

    0.3, -1.0,
    -0.3, -1.0,
    0.3, 0.5,
//puerta cuadrado central 
    -0.2, -0.5,
    -0.2, -1.0,
    0.2, -0.5,

    0.2, -1.0,
    -0.2, -1.0,
    0.2, -0.5,
//cuadrado pequeño
    -0.2, 0.0,
    0.0, 0.2,
    0.2, 0.0,

    -0.2, 0.0,
    0.0, -0.2,
    0.2, 0.0,
//techo central
    -0.3, 0.5,
    0.3, 0.5,
    0.0, 0.9,
//FIGURA DERECHA 
    0.3, 0.0, //cuadrado
    0.3, -1.0,
    0.9, 0.0,

    0.3, -1.0,
    0.9, -1.0,
    0.9, 0.0,

    0.3, 0.0, //techo 
    0.6, 0.6,
    0.9, 0.0,

    0.6, 0.6, //bandera
    0.6, 0.85,
    0.8, 0.73,

    0.45, -0.7, //cuadrado pequeño
    0.75, -0.7,
    0.6, -0.55,

    0.45, -0.7,
    0.75, -0.7,
    0.6, -0.85,

    0.5, -0.35,
    0.5, -0.15,
    0.7, -0.15,

    0.5, -0.35,
    0.7, -0.35,
    0.7, -0.15,

    0.45, -0.25,
    0.6, -0.1,
    0.75, -0.25,

    0.45, -0.25,
    0.6, -0.4,
    0.75, -0.25
];

const vertexColor =[
    //FIGURA IZQUIERDA
    1,1,0, //triangulo 1 amarillo
    1,1,0,
    1,1,0,

    1,1,0, //triangulo 2 amarillo
    1,1,0,
    1,1,0,

    0,1,1, //cuadrado celeste
    0,1,1,
    0,1,1,

    0,1,1, //cuadrado celeste
    0,1,1,
    0,1,1,

    0,0.8,0, //triangulo verde izquierdo
    0,0.8,0,
    0,0.8,0,

    1,0,0, //bandera izquierda roja
    1,0,0,
    1,0,0,
//FIGURA CENTRAL
    1,0.5,0, //casa central naranja
    1,0.5,0,
    1,0.5,0,

    1,0.5,0,
    1,0.5,0,
    1,0.5,0,
//rojo oscuro
    0.55,0,0, 
    0.55,0,0,
    0.55,0,0,

    0.55,0,0,
    0.55,0,0,
    0.55,0,0,
//celeste
    0,1,1,
    0,1,1,
    0,1,1,

    0,1,1,
    0,1,1,
    0,1,1,
//techo morado
    1,0,1,
    1,0,1,
    1,0,1,
//FIGURA DERECHA
    1,1,0, //amarillo
    1,1,0,
    1,1,0,

    1,1,0, //amarillo
    1,1,0,
    1,1,0,

    0,0.8,0, //triangulo verde derecho
    0,0.8,0,
    0,0.8,0,

    1,0,0, //bandera roja derecha
    1,0,0,
    1,0,0,

    1,0,1, //morado
    1,0,1,
    1,0,1,

    1,0,1, //morado
    1,0,1,
    1,0,1,
//celeste
    0,1,1,
    0,1,1,
    0,1,1,

    0,1,1,
    0,1,1,
    0,1,1,

    0,1,1,
    0,1,1,
    0,1,1,

    0,1,1,
    0,1,1,
    0,1,1

];

const positionBuffer = gl.createBuffer();   //crear buffer de vertices
const colorBuffer = gl.createBuffer();   //crear buffer de colores

gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);  //ESTABLECE BUFFER DE ARREGLOS
//ASIGNA VALORES QUE RECIBE EL BUFFER Y DEFINE TIPO DE DIBUJO
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(trianguloCoords),gl.STATIC_DRAW);

//SUSTRAE POSICION DEL VERTEXSHADER  Y LO PASA ALPROGRAMA
const position = gl.getAttribLocation(program,'position');
//HABILITA EL ARRAY DE VERTICES
gl.enableVertexAttribArray(position);
gl.vertexAttribPointer(position,2,gl.FLOAT,gl.FALSE,0,0);


gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);  //ESTABLECE BUFFER DE ARREGLOS
//ASIGNA VALORES QUE RECIBE EL BUFFER Y DEFINE TIPO DE DIBUJO
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertexColor),gl.STATIC_DRAW);

//SUSTRAE POSICION DEL VERTEXSHADER  Y LO PASA ALPROGRAMA
const color = gl.getAttribLocation(program,'color');
//HABILITA EL ARRAY DE VERTICES
gl.enableVertexAttribArray(color);
gl.vertexAttribPointer(color,3,gl.FLOAT,gl.FALSE,0,0);

gl.drawArrays(gl.TRIANGLES,0,69);
