import org.openqa.selenium.By;
import org.openqa.selenium.Point;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
public class page2Test_v2 {
  public static void main(String[] args) {
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

        button.click();

        // ---------------------------------
        // -----Check Element Existence-----
        // ---------------------------------

         // Check if the image exists
         WebElement image = driver.findElement(By.className("word-logo"));
         if (image.isDisplayed()) {
             System.out.println("PASSED: Image exists on the page.");
         } else {
             System.out.println("FAILED: Image does not exist on the page.");
         }
 
         // Check if radio inputs exist
         WebElement radioInput1 = driver.findElement(By.id("preference1"));
         WebElement radioInput2 = driver.findElement(By.id("preference2"));
         WebElement radioInput3 = driver.findElement(By.id("preference3"));
         if (radioInput1.isDisplayed() && radioInput2.isDisplayed() && radioInput3.isDisplayed()) {
             System.out.println("PASSED: Radio inputs exist on the page.");
         } else {
             System.out.println("FAILED: Radio inputs do not exist on the page.");
         }
 
         // Check if slider exists
         WebElement slider = driver.findElement(By.id("rating-input"));
         if (slider.isDisplayed()) {
             System.out.println("PASSED: Slider exists on the page.");
         } else {
             System.out.println("FAILED: Slider does not exist on the page.");
         }
 
         // Check if button exists
         WebElement button2 = driver.findElement(By.className("average-button"));
         if (button2.isDisplayed()) {
             System.out.println("PASSED: Button exists on the page.");
         } else {
             System.out.println("FAILED: Button does not exist on the page.");
         }

        //  -------------------------------------------
        // ------------Element Content-----------------
        // --------------------------------------------
        // Check for the content 
        WebElement cardHeader = driver.findElement(By.tagName("h6"));
        String expectedText = "Meaning of this Word:";
        String actualText = cardHeader.getText();
        // System.out.println(actualText);
        if (actualText.equals(expectedText)) {
            System.out.println("PASSED: Content is correct.");
        } else {
            System.out.println("FAILED: Content is incorrect.");
        }

        String expectedButtonText = "Next";
        String actualButtonText = button2.getText();
        if (actualButtonText.equals(expectedButtonText)) {
            System.out.println("PASSED: Content 'Next' on the button is correct.");
        } else {
            System.out.println("FAILED: Content 'Next' on the button is incorrect.");
        }

        // -----------------------------------------------
        // --------------Relative Position----------------
        // -----------------------------------------------

        boolean isSliderBelowRadioInputs = isBelow(radioInput1, slider) && isBelow(radioInput2, slider) && isBelow(radioInput3, slider);
        if (isSliderBelowRadioInputs) {
            System.out.println("PASSED: Slider is below the radio inputs.");
        } else {
            System.out.println("FAILED: Slider is not below the radio inputs.");
        }

        // Check if the button is below the slider
        boolean isButtonBelowSlider = isBelow(slider, button2);
        if (isButtonBelowSlider) {
            System.out.println("PASSED: Button is below the slider.");
        } else {
            System.out.println("FAILED: Button is not below the slider.");
        }

        // -----------------------------------------------
        // --------Checking Link to Result Page-----------
        // -----------------------------------------------
        // Click the button repeatedly until the result page is reached or max iterations reached
        int maxIterations = 21;
        int iteration = 0;
        boolean reachedResultPage = false;
        while (iteration < maxIterations && !reachedResultPage) {
            // Click the button
            WebElement button3 = driver.findElement(By.className("average-button"));
            button3.click();

            
            if (driver.getTitle().equals("Assignment 5:GUI Testing:Result")) {
                reachedResultPage = true;
            }

            // Increment the iteration counter
            iteration++;
        }

        // Check if the result page is reached or not
        if (reachedResultPage) {
            System.out.println("PASSED: Reached the result page.");
        } else {
            System.out.println("FAILED: Could not reach the result page after " + maxIterations + " iterations.");
        }

        driver.quit();
  }

  private static boolean isBelow(WebElement element1, WebElement element2) {
    int element1Bottom = element1.getLocation().getY() + element1.getSize().getHeight();
    int element2Top = element2.getLocation().getY();
    return element1Bottom <= element2Top;
}
}
