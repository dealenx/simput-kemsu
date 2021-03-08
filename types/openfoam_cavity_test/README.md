# openfoam_cavity_test

OpenFOAM let you generate the script that should be run cavity case.

This will generate a `run.sh` file based on the cavity case.

Then the execution should be done as follow:

## Simput Integration

Simput provides a simple way to write any kind of text file.
This project is meant to illustrate how Simput can be used to generate templated files. Simput requires a javascript description of any user input. To build a Simput package use;

```sh
$ Simput -c src/ -o versions/ -t openfoam_cavity_test
```

Add the compiled package to Simput:

```sh
$ Simput -a versions/openfoam_cavity_test.js
```
