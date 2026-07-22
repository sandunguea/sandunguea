import gulp from "gulp";
const { src, dest, watch, series } = gulp;

// Herramientas para imágenes
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import avif from 'gulp-avif';



const imagenes= (done)=>{
    const opciones={
        optimizationLevel:3
    }
    src('src/img/**/*')
    .pipe(imagemin({opciones}))
    .pipe(dest('assets/img'));
    done();
}

const versionWebp=()=>{
    return src('src/img/**/*.{png,jpg}')
    .pipe(webp())
    .pipe(dest('assets/img'))
}

const versionAvif=(done)=>{
    const opciones={
        quality:50
    }
    src('src/img/**/*.{png,jpg}')
    .pipe(avif(opciones))
    .pipe(dest('assets/img'))
    done();
}




//ahora esucha por imagenes y por scss
const dev = () => {
    watch('src/img/**/*', imagenes);
}
export default series(imagenes, versionWebp, versionAvif, dev);