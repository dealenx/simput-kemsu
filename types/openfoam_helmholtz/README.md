# openfoam_helmholtz

OpenFOAM let you generate the script that should be run cavity case.

This will generate a `run.sh` file based on the cavity case.

Then the execution should be done as follow:

## Simput Integration

Simput provides a simple way to write any kind of text file.
This project is meant to illustrate how Simput can be used to generate templated files. Simput requires a javascript description of any user input. To build a Simput package use;

```sh
$ Simput -c src/ -o versions/ -t openfoam_helmholtz
```

Add the compiled package to Simput:

```sh
$ Simput -a versions/openfoam_helmholtz.js
```

then to build in Simput 
```
cd ../..
Simput -mc types/openfoam_helmholtz/src/ -t openfoam_helmholtz -o dist/types
```
