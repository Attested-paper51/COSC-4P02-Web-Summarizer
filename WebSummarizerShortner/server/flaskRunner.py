import subprocess
import os

if __name__ == '__main__':
    try: 
        currentdir = os.path.dirname(os.path.abspath(__file__))
        os.chdir(currentdir)
        file1 = subprocess.Popen(['python','authentication.py'])
        file2 = subprocess.Popen(['python','shortenerFlask.py'])
        file3 = subprocess.Popen(['python','server.py'])
        
        
        file1.wait()
        file2.wait()
        file3.wait()
    except KeyboardInterrupt:
        print("Keyboard Interrupt, program ending.")