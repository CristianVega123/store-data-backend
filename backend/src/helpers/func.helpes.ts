import { access, constants, mkdir } from 'node:fs/promises';
import { path_dirRoot_src } from '../url';

/**
 ** Identificar si la carpeta raiz ("Store") existe, si esta no exites, entonces la funcion access dará error y será capturado y mandará la función para crear un dir.
 */
export async function validateFolder(FindPath: string) {
  try {
    await access(`${path_dirRoot_src}${FindPath}`, constants.F_OK);
  } catch (error) {
    await mkdir(`${path_dirRoot_src}${FindPath}`);
  }
}
