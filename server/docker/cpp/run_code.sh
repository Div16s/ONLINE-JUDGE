#!/bin/bash

# Define file names
code_file="code.cpp"
input_file="input.txt"
output_file="output.txt"
error_file="error.txt"

# Check if the code contains a main function
if ! grep -q "int main" $code_file; then
    echo "Error: No main function found in the code." > $error_file
    cat $error_file
else 
    # Compile the code
    g++ -o code $code_file 2> $error_file

    # Check if compilation was successful
    if [ $? -ne 0 ]; then
        # Prepend "Compilation failed." to the error file
        echo "Compilation failed." > temp_error.txt
        cat $error_file >> temp_error.txt
        mv temp_error.txt $error_file
        cat $error_file
    else
        # Run the compiled code with input and save the output
        ./code < $input_file > $output_file 2>> $error_file

        # Check if there were any runtime errors
        if [ -s $error_file ]; then
            echo "Runtime error:"
            cat $error_file
        else
            echo "Success:"
            cat $output_file
        fi
    fi
fi