$(document).ready(function()
{
    if($('#modalConfirmDelete').length)
    {
        $('#modalConfirmDelete').modal('open');
    }

    if($('#buttonSaveAsTemplate').length)
    {
        $('#buttonSaveAsTemplate').click(function()
        {
            // check if transaction form is valid
            let isValidForm = validateForm(true);
            if(!isValidForm)
            {
                $('#modalCreateFromTransaction').modal('close');
                M.toast({html: createTemplateWithErrorInForm});
                return;
            }

            $.ajax({
                type: 'GET',
                url: $('#buttonSaveAsTemplate').attr('data-url'),
                data: {},
                success: function(data)
                {
                   createAndOpenModal(data)
                }
            });
        });
    }
});

function createAndOpenModal(data)
{
    let modalID = '#modalCreateFromTransaction';

    $('#saveAsTemplateModalContainer').html(data);
    $(modalID).modal();
    $(modalID).modal('open');
    let templateNameInput = document.getElementById('template-name');
    templateNameInput.focus();
    $(templateNameInput).on('keypress', function(e)
    {
        let code = e.keyCode || e.which;
        if(code === 13)
        {
            saveAsTemplate();
        }
    });

    $('#buttonCreateTemplate').click(function()
    {
        saveAsTemplate();
    });
}

function saveAsTemplate()
{
    // validate template name
    let templateName = document.getElementById('template-name').value;
    let isValid = validateTemplateName(templateName);
    if(!isValid)
    {
        return
    }

    let form = document.getElementsByName('NewTransaction')[0];
    form.appendChild(createAdditionalHiddenInput('templateName', templateName));
    form.appendChild(createAdditionalHiddenInput('ignoreCategory', document.getElementById('ignore-category').checked));
    form.appendChild(createAdditionalHiddenInput('ignoreAccount', document.getElementById('ignore-account').checked));

    // replace form target url
    form.action = $('#buttonCreateTemplate').attr('data-url');
    form.submit();
}

function validateTemplateName(templateName)
{
    if(templateName.length === 0)
    {
        addTooltip('template-name', templateNameEmptyValidationMessage);
        return false;
    }
    else
    {
        removeTooltip('template-name');
    }

    if(existingTemplateNames.includes(templateName))
    {
        addTooltip('template-name', templateNameDuplicateValidationMessage);
        return false;
    }
    else
    {
        removeTooltip('template-name');
    }

    return true;
}

function createAdditionalHiddenInput(name, value)
{
    let newInput = document.createElement('input');
    newInput.setAttribute('type', 'hidden');
    newInput.setAttribute('name', name);
    newInput.setAttribute('value', value);
    return newInput;
}