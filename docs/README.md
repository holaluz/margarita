# How to edit docs

All files with extension `.mdx` are written following [markdown rules](https://guides.github.com/features/mastering-markdown/) 

## How to edit a file

### **1. Create a new branch starting from `master` branch:**

Branch name is up to you, it is recommended to use something related to the change about to be made
(**ie**: `update-colors-text`) 
_See more about [creating branches with Github Desktop](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/managing-branches#creating-a-branch)_

### **2. Edit the file:**

Go to [`/docs`](https://github.com/holaluz/margarita/tree/master/docs) folder, find the file to be modified and edit it. Get your hands dirty! 
_All files are written in following [markdown rules](https://guides.github.com/features/mastering-markdown/)._

### **3. Add and commit your changes to your branch:**

_See more about [adding and commiting changes with Github Desktop](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/committing-and-reviewing-changes-to-your-project#2-selecting-changes-to-include-in-a-commit)_

### **4. Create a pull request:**

  -    Name the pull request following the semantic release convention used for documentation in this repository
    (**ie:** `docs: Update paragraph in colors guide`)

  - Once the pull request is created, checks are triggered at the end of the page. In the checks box you will also find a link to see the preview: click on "Details" from "Storybook Preview".

    _See more about [creating a pull request](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/creating-an-issue-or-pull-request#creating-a-pull-request)_

### **5. Re-edit:**

If you like what you see, go to step 6. If you don’t, edit and repeat steps 2 and 3.

### **6. Ask for a review:**
It’s mandatory. (In the left sidebar you can choose a reviewer)

*Tip:* If you choose `Holaluz/frontend` GitHub sends a message to all the Frontend team members so the first one free can have a look at it.

  - If your reviewer asks for changes repeat steps 2 and 3. If you nailed it and the pull request is approved go to next step.
  - Merge to master!: Use the PR name as commit name for merging (**ie**: `docs: Update paragraph in colors guide`) :rocket:

    Merging to master triggers a new deploy of the documentation site, in a few minutes you will see your changes live [here](https://holaluz.github.io/margarita/)

## Extras

### How to add images

Images _(.svg, .png)_ are stored in [`.storybook/public/images`](https://github.com/holaluz/margarita/tree/master/.storybook/public/images)

  - Add the new image in [`/images`](https://github.com/holaluz/margarita/tree/master/.storybook/public/images) folder

  - In the `.mdx` file use the markdown syntax for images where you want to import it: `!["alt"]("path/filename.extension")`

    (**ie:** `![Margarita logo](/images/margarita.png)`)

    *the path of the folder is "/images/"

New folders inside [`/images`](https://github.com/holaluz/margarita/tree/master/.storybook/public/images) can be created, just remember to modify the file path when importing it in the markdown text.

### Sorting/ordering files
The documentation site sidebar is composed by the folders inside [`/docs`](https://github.com/holaluz/margarita/tree/master/docs) such as `introduction` or `tokens`.

The sorting of files inside a section follows alphabetical ascending order (A->Z) based on the filename. 

If a different order is needed please specify it [here](https://github.com/holaluz/margarita/blob/master/.storybook/preview.js#L14)
