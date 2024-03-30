import subprocess

if __name__ == '__main__':
    file1 = subprocess.Popen(['python','authentication.py'])
    file2 = subprocess.Popen(['python','shortenerFlask.py'])
    #file3 = subprocess.Popen(['python','server.py'])
    
    file1.wait()
    file2.wait()
    #file3.wait()