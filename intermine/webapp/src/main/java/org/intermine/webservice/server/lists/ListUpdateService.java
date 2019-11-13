package org.intermine.webservice.server.lists;

/*
 * Copyright (C) 2002-2019 FlyMine
 *
 * This code may be freely distributed and modified under the
 * terms of the GNU Lesser General Public Licence.  This should
 * be distributed with the code.  See the LICENSE file for more
 * information or http://www.gnu.org/copyleft/lesser.html.
 *
 */

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.intermine.api.InterMineAPI;
import org.intermine.api.profile.BagDoesNotExistException;
import org.intermine.api.profile.InterMineBag;
import org.intermine.api.profile.Profile;
import org.intermine.webservice.server.exceptions.BadRequestException;
import org.intermine.webservice.server.exceptions.MissingParameterException;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

/**
 * A service for updating list descriptions.
 * @author Daniela Butano
 *
 */
public class ListUpdateService extends AuthenticatedListService
{
    Map<String, String> parameters = null;
    private static final Logger LOG = Logger.getLogger(ListUpdateService.class);

    /**
     * Constructor.
     * @param im The InterMine application object.
     */
    public ListUpdateService(InterMineAPI im) {
        super(im);
    }

    @Override
    protected void execute() throws Exception {
        String listName = getRequiredParameter("name");
        String newListDescription = getRequiredParameter("newDescription");
        Profile profile = getPermission().getProfile();
        try {
            profile.updateBagDescription(listName, newListDescription);
        } catch (BagDoesNotExistException ex) {
            throw new BadRequestException("The list " + listName + " does not belong to the user");
        }

        InterMineBag list = profile.getSavedBags().get(listName);
        addOutputInfo(LIST_NAME_KEY, list.getName());
        addOutputInfo(LIST_DESCRIPTION_KEY, list.getDescription());
    }
}
