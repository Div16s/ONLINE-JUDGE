#!/bin/bash

# Set the input and code files
code_file="code.c"
input_file="input.txt"
output_file="output.txt"
error_file="error.txt"

# Compile the code
gcc $code_file -o /a.out 2> $error_file

# Check if compilation was successful
if [ $? -ne 0 ]; then
    # Prepend "Compilation failed." to the error file
    echo "Compilation failed." > temp_error.txt
    cat $error_file >> temp_error.txt
    mv temp_error.txt $error_file
    cat $error_file

else
    # Check if the code contains a main function
    if ! grep -q "int main" $code_file; then
        echo "Error: No main function found in the code." > $error_file
        cat $error_file
        
    else
        # Run the compiled program with input
        /a.out < $input_file > $output_file 2>> $error_file

        # Check if execution was successful
        if [ $? -ne 0 ]; then
            echo "Runtime error: " >> $error_file
            cat $error_file
        else
            echo "Output: "
            cat $output_file
        fi
    fi
fi
