using Microsoft.VisualBasic.FileIO;
using System;
using System.IO;

namespace CopyDirectory
{
    public class CopyDirectoryApp
    {
        private static void Main()
        {
            string sourceDirName; string destDirName; bool copySubDirs = false;

            // Ask the user to type the source directory.
            Console.WriteLine("Please type the source directory, and then press Enter");
            sourceDirName = Console.ReadLine();

            // Ask the user to type the destination directory.
            Console.WriteLine("Please type the destination directory, then press Enter");
            destDirName = Console.ReadLine();

            // Ask the user if they would like to copy the subdirectories too.
            Console.WriteLine("Would you like to copy the subdirectories? Enter yes or no, then press Enter");
            switch (Console.ReadLine().ToLower())
            {
                case "yes":
                    copySubDirs = true;
                    break;
                case "no":
                    copySubDirs = false;
                    break;
            }

            DirectoryCopy(sourceDirName, destDirName, copySubDirs);
        }

        private static void DirectoryCopy(string sourceDirName, string destDirName, bool copySubDirs, bool allOverwrite = false)
        {
            
            // Get the subdirectories for the specified directory.
            DirectoryInfo dir = new DirectoryInfo(sourceDirName);

            if (!dir.Exists)
            {
                Console.WriteLine("Source directory does not exist or could not be found: " + sourceDirName);
                Main();
            }

            DirectoryInfo[] dirs = dir.GetDirectories();

            // If the destination directory doesn't exist, create it.       
            Directory.CreateDirectory(destDirName);

            // Get the files in the directory and copy them to the new location.
            FileInfo[] files = dir.GetFiles();
            foreach (FileInfo file in files)
            {
                string tempPath = Path.Combine(destDirName, file.Name);
                if (!FileSystem.FileExists(tempPath)) 
                {
                    CopyFile(file, tempPath, false);
                } else
                {
                    if (!allOverwrite)
                    {
                        // Ask the user if they want to overwrite existing files.
                        Console.WriteLine($"Do you want to overwrite existing file {tempPath}? Enter yes, no or all (which replaces all files), then press Enter");
                        switch (Console.ReadLine().ToLower())
                        {
                            case "yes":
                                CopyFile(file, tempPath, true);
                                break;
                            case "no":
                                Console.WriteLine("File not replaced.");
                                break;
                            case "all":
                                CopyFile(file, tempPath, true);
                                allOverwrite = true;
                                break;
                        }
                    }
                    else
                    {
                        CopyFile(file, tempPath, true);
                    }
                }
                
            }

            // If copying subdirectories, copy them and their contents to new location.
            if (copySubDirs)
            {
                foreach (DirectoryInfo subdir in dirs)
                {
                    string tempPath = Path.Combine(destDirName, subdir.Name);
                    DirectoryCopy(subdir.FullName, tempPath, copySubDirs, allOverwrite);
                }
            }
        }
        private static void CopyFile(FileInfo file, string tempPath, bool overwrite)
        {
            Console.WriteLine("Copying " + file + " to " + tempPath);
            file.CopyTo(tempPath, overwrite);
        }
    }
}
