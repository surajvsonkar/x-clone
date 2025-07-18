"use client"

import { IKImage } from "imagekitio-next"
const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

interface imageType {
    path: string,
    height?: number,
    width?: number,
    alt: string,
    className?: string,
    tr?: boolean;
}

const Image = ({path,height,width,alt,className,tr}: imageType) => {
  return (
    <IKImage urlEndpoint={urlEndPoint} path={path} {...(tr
        ? { transformation: [{ width: `${width}`, height: `${height}` }] }
        : { width: width, height: height })} alt={alt} className={className}  />
  )
}

export default Image