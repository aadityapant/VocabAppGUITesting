import org.openqa.selenium.By;
import org.openqa.selenium.Point;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
public class page1Test_v2 {
    public static void main(String[] args) throws Exception {
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\aditp\\Documents\\lib\\selenium\\chromedriver-win64\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        driver.get("http://127.0.0.1:5500/version_2/index.html");
        driver.manage().window().maximize();

        // Get Elements
        // Check if the button exists
        WebElement button = null;
        try {
            button = driver.findElement(By.className("average-button"));
            System.out.println("PASSED: Button exists on the page.");
        } catch (org.openqa.selenium.NoSuchElementException e) {
            System.out.println("FAILED: Button does not exist on the page.");
        }

        // Check if the radio buttons exist
        WebElement radio1 = null;
        WebElement radio2 = null;
        WebElement radio3 = null;
        try {
            radio1 = driver.findElement(By.id("preference1"));
            radio2 = driver.findElement(By.id("preference2"));
            radio3 = driver.findElement(By.id("preference3"));
            System.out.println("PASSED: All radio buttons exist on the page.");
        } catch (org.openqa.selenium.NoSuchElementException e) {
            System.out.println("FAILED: One or more radio buttons do not exist on the page.");
        }

        // Check if the slider exists
        WebElement slider = null;
        try {
            slider = driver.findElement(By.id("difficulty"));
            System.out.println("PASSED: Slider exists on the page.");
        } catch (org.openqa.selenium.NoSuchElementException e) {
            System.out.println("FAILED: Slider does not exist on the page.");
        }

        // Check if the image exists
        WebElement image = null;
        try {
            image = driver.findElement(By.className("logo"));
            System.out.println("PASSED: Image exists on the page.");
        } catch (org.openqa.selenium.NoSuchElementException e) {
            System.out.println("FAILED: Image does not exist on the page.");
        }
        // ----------------------------------------------
        // ------Check the location of the button--------
        // ----------------------------------------------

        // ------------------------------------------
        // --------Relative Location-----------------
        // ------------------------------------------

        WebElement parentDiv = driver.findElement(By.className("vocab-app-intro"));

        WebElement buttonVerify = parentDiv.findElement(By.className("average-button"));
        verifyElementLocation(buttonVerify, "Button");

        // Check if the radio buttons are placed inside the desired div
        WebElement radio1Verify = parentDiv.findElement(By.id("preference1"));
        WebElement radio2Verify = parentDiv.findElement(By.id("preference2"));
        WebElement radio3Verify = parentDiv.findElement(By.id("preference3"));
        verifyElementLocation(radio1Verify, "Radio 1");
        verifyElementLocation(radio2Verify, "Radio 2");
        verifyElementLocation(radio3Verify, "Radio 3");

        // Check if the slider is placed inside the desired div
        WebElement sliderVerify = parentDiv.findElement(By.id("difficulty"));
        verifyElementLocation(sliderVerify, "Slider");

        // Check if the image is placed inside the desired div
        WebElement imageVerify = parentDiv.findElement(By.className("logo"));
        verifyElementLocation(imageVerify, "Image");

        // Check if radio inputs are below the slider
        boolean areRadioInputsBelowSlider = isBelow(slider, radio1) && isBelow(slider, radio2) && isBelow(slider, radio3);
        if (areRadioInputsBelowSlider) {
            System.out.println("PASSED: Radio inputs are below the slider.");
        } else {
            System.out.println("FAILED: Radio inputs are not below the slider.");
        }

        // Check if the button is below the radio inputs
        boolean isButtonBelowRadioInputs = isBelow(radio1, button) || isBelow(radio2, button) || isBelow(radio3, button);
        if (isButtonBelowRadioInputs) {
            System.out.println("PASSED:Button is below the radio inputs.");
        } else {
            System.out.println("FAILED: Button is not below the radio inputs.");
        }

        //----------------------------------------------
        // ---------Checking the Content----------------
        // ---------------------------------------------

        String buttonText = button.getText();

        // Check the content of the button
        if (buttonText.equals("Take Quiz")) {
            System.out.println("PASSED: Button content is correct.");
        } else {
            System.out.println("FAILED: Button content is incorrect.");
        }

        WebElement radio1Label = driver.findElement(By.id("preference1-label"));
        WebElement radio2Label = driver.findElement(By.id("preference2-label"));
        WebElement radio3Label = driver.findElement(By.id("preference3-label"));
        String label1 = radio1Label.getText();
        String label2 = radio2Label.getText();
        String label3 = radio3Label.getText();
        // System.out.println(label1+label2+);
        // Check the labels of the radio inputs
        if (label1.equals("10 questions") && label2.equals("15 questions") && label3.equals("20 questions")) {
            System.out.println("PASSED: Labels of radio inputs are correct.");
        } else {
            System.out.println("FAILED: Labels of radio inputs are incorrect.");
        }

        button.click();


        // Verify the title of the new page
        String expectedTitle = "Assignment 5:GUI Testing:Quiz";
        String actualTitle = driver.getTitle();
        if (actualTitle.equals(expectedTitle)) {
            System.out.println("PASSED: Title verification passed. The title of the new page is correct. The link to the new page is working.");
        } else {
            System.out.println("FAILED: Title verification failed. The title of the new page is incorrect. The link to the new page is NOT working.");
        }
        
        driver.close();
        

    }
   
    // Check if element inside the div
    private static void verifyElementLocation(WebElement element, String elementName) {
        if (element != null) {
            System.out.println( "PASSED: " + elementName + " is placed inside the content card.");
        } else {
            System.out.println("FAILED: " + elementName + " is not placed inside the content card.");
        }
    }
    private static boolean isBelow(WebElement element1, WebElement element2) {
        int element1Bottom = element1.getLocation().getY() + element1.getSize().getHeight();
        int element2Top = element2.getLocation().getY();
        return element1Bottom <= element2Top;
    }
}