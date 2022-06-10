#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(){
    FILE* file = fopen("JEEP.txt", "r");
    char* input = malloc(256);
    printf("ENTER A DESTINATION: ");
    fgets(input, 256, stdin);
    if ((strlen(input) > 0) && (input[strlen (input) - 1] == '\n'))
        input[strlen (input) - 1] = '\0';
    char jeep[2048];
    do {
        fgets(jeep, 2048, file);
        char* token = strtok(jeep, ":");
        int steps = 0;
        while(token != NULL) {
            steps++;
            if(!strcmp(input, token)) {
                printf("THERE ARE %i steps from my heart to %s\n", steps, token);
                break;
            }
            token = strtok(NULL, "-");
        }
    } while(!feof(file));
	return 0;
}
