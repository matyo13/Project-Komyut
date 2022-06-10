#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int step_counter(char *input){
    FILE* file = fopen("JEEP.txt", "r");

    char jeep[2048];
    do {
        fgets(jeep, 2048, file);
        char* token = strtok(jeep, ":");
        int steps = 0;
        while(token != NULL) {
            steps++;
            if(!strcmp(input, token)) {
//                printf("THERE ARE %i steps from my heart to %s\n", steps, token);
                return steps;
            }
            token = strtok(NULL, "-");
        }
    } while(!feof(file));
    fclose(file);
}

int main(){
    char* location = (char *)malloc(256 * sizeof(char));
    char* destination = (char *)malloc(256 * sizeof(char));

    printf("ENTER YOUR LOCATION: ");
    fgets(location, 256, stdin);
    if ((strlen(location) > 0) && (location[strlen (location) - 1] == '\n'))
        location[strlen (location) - 1] = '\0';

    printf("ENTER A DESTINATION: ");
    fgets(destination, 256, stdin);
    if ((strlen(destination) > 0) && (destination[strlen (destination) - 1] == '\n'))
        destination[strlen (destination) - 1] = '\0';
    
    printf("THERE ARE %d steps from %s to %s\n", step_counter(destination) - step_counter(location), location, destination);

	return 0;
}
