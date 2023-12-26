/*eslint-disable*/

import styles from './Avatar.module.css';
import { ImgHTMLAttributes } from 'react';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    hasBorder?: boolean,
    //src: string,
    //alt?: string
    //essas duas de cima são herdadas do ImgHTMLAttributes
}

//aplicando destructuring e definindo hasBorder como true por padrão
//o destructuring retira propriedades de um objeto e as transforma em variáveis
export function Avatar({hasBorder = true, ...props}: AvatarProps) {
    // const hasBorder = props.hasBorder !== false; //se tiver qualquer valor que não seja hasBorder = { false } ele vai ter borda por padrão

    return (
        <img className={hasBorder ? styles.avatarWithBorder : styles.avatar} 
        //src={src} 
        //alt={alt} 
        {...props} //cada propriedade que eu passar vai ser adicionada no elemento
        />
    );
}